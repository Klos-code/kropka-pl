import subprocess, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
W,H=1080,1920
F='/usr/share/fonts/opentype/inter/'
def font(w,s): return ImageFont.truetype(F+f'InterDisplay-{w}.otf', s)
DARK=(18,20,22,255); WHITE=(255,255,255,255); ACC=(255,200,61,255)
os.makedirs('ov',exist_ok=True)
SRC='src2/src.mp4'
SEGS=[(0.0,6.95,False),(7.35,11.10,True),(11.95,16.40,False)]
END=2.8
def out_t(t):
    acc=0
    for a,b,_ in SEGS:
        if a-0.01<=t<=b+0.01: return acc+(min(max(t,a),b)-a)
        acc+=b-a
    raise ValueError(t)
MAIN=sum(b-a for a,b,_ in SEGS); TOTAL=MAIN+END

def shadow_layer(img, blur=18, alpha=110, off=(0,8)):
    a=img.split()[3]
    sh=Image.new('RGBA',img.size,(0,0,0,0)); sh.putalpha(a.point(lambda v: v*alpha//255))
    sh=sh.filter(ImageFilter.GaussianBlur(blur))
    base=Image.new('RGBA',img.size,(0,0,0,0)); base.alpha_composite(sh,off); base.alpha_composite(img); return base

def card(lines, y, fnt, pad=(54,34), gap=12, radius=40, bg=WHITE, fg=DARK, hl=None):
    # lines: list of list of (text,color)
    d=ImageDraw.Draw(Image.new('RGBA',(1,1)))
    lw=[sum(d.textlength(t,font=fnt) for t,_ in ln) for ln in lines]
    asc,desc=fnt.getmetrics(); lh=asc+desc
    cw=max(lw)+2*pad[0]; ch=len(lines)*lh+(len(lines)-1)*gap+2*pad[1]
    img=Image.new('RGBA',(W,H),(0,0,0,0)); dr=ImageDraw.Draw(img)
    x0=(W-cw)//2; dr.rounded_rectangle([x0,y,x0+cw,y+ch],radius=radius,fill=bg)
    yy=y+pad[1]
    for ln,w in zip(lines,lw):
        xx=(W-w)/2
        for t,c in ln:
            dr.text((xx,yy),t,font=fnt,fill=c); xx+=dr.textlength(t,font=fnt)
        yy+=lh+gap
    return shadow_layer(img,blur=22,alpha=90,off=(0,10))

# hook card
hf=font('ExtraBold',72)
card([[('Отримали ',DARK),('відмову',(201,126,0,255))],[('в карті побуту?',DARK)]], 450, hf).save('ov/hook.png')

# phone pill (top)
def phone_pill(y):
    pf=font('Bold',50); lf=font('SemiBold',30)
    img=Image.new('RGBA',(W,H),(0,0,0,0)); dr=ImageDraw.Draw(img)
    num='+48 539 408 468'; tw=dr.textlength(num,font=pf)
    lab='ТЕЛЕФОНУЙТЕ'; lw=dr.textlength(lab,font=lf)
    cw=max(tw,lw)+110; ch=150; x0=(W-cw)//2
    dr.rounded_rectangle([x0,y,x0+cw,y+ch],radius=75,fill=(15,17,19,175))
    dr.text(((W-lw)/2,y+22),lab,font=lf,fill=ACC)
    dr.text(((W-tw)/2,y+62),num,font=pf,fill=WHITE)
    return shadow_layer(img,blur=20,alpha=70,off=(0,8))
phone_pill(250).save('ov/phone.png')

# captions: list of (words with start), chunk end
CH=[([('Це',3.28),('ще',3.48),('не',3.70),('кінець.',3.86)],4.40),
    ([('У',4.40),('вас',4.48),('є',4.62),('14',4.78),('днів',5.30)],5.68),
    ([('щоб',5.68),('подати',5.76),('оскарження.',6.16)],6.90),
    ([('Часто',7.44),('причина',7.84),('відмови —',8.26)],8.76),
    ([('помилка',8.76),('в',9.14),('документах,',9.26)],10.36),
    ([('яку',10.36),('можна',10.50),('виправити.',10.90)],11.08),
    ([('Принесіть',12.04),('нам',12.42),('рішення,',12.60)],13.60),
    ([('подивимось,',13.60),('що',14.16),('можна',14.30),('зробити.',14.72)],15.50),
    ([('Телефонуйте.',15.58)],16.35)]
cf=font('ExtraBold',84)
def cap_img(words,hi):
    img=Image.new('RGBA',(W,H),(0,0,0,0)); dr=ImageDraw.Draw(img)
    sp=dr.textlength(' ',font=cf)
    ws=[dr.textlength(w,font=cf) for w,_ in words]
    # wrap to max 900px
    lines=[[]]; cur=0
    for i,w in enumerate(ws):
        if lines[-1] and cur+sp+w>900: lines.append([]); cur=0
        lines[-1].append(i); cur+= (sp if len(lines[-1])>1 else 0)+w
    asc,desc=cf.getmetrics(); lh=asc+desc+6
    y=1300-(len(lines)-1)*lh
    for ln in lines:
        tw=sum(ws[i] for i in ln)+sp*(len(ln)-1); x=(W-tw)/2
        for i in ln:
            dr.text((x,y),words[i][0],font=cf,fill=ACC if i==hi else WHITE); x+=ws[i]+sp
        y+=lh
    return shadow_layer(img,blur=14,alpha=200,off=(0,4))
caps=[]
for ci,(words,end) in enumerate(CH):
    for wi,(w,s) in enumerate(words):
        e=words[wi+1][1] if wi+1<len(words) else end
        p=f'ov/cap_{ci}_{wi}.png'; cap_img(words,wi).save(p); caps.append((p,out_t(s),out_t(e)))

# end card overlay
img=Image.new('RGBA',(W,H),(0,0,0,0)); dr=ImageDraw.Draw(img)
cw,chh=880,560; x0=(W-cw)//2; y0=620
dr.rounded_rectangle([x0,y0,x0+cw,y0+chh],radius=48,fill=WHITE)
def ctext(t,f,y,c):
    tw=dr.textlength(t,font=f); dr.text(((W-tw)/2,y),t,font=f,fill=c)
ctext('Зателефонуйте',font('ExtraBold',78),y0+60,DARK)
ctext('+48 539 408 468',font('ExtraBold',74),y0+175,(201,126,0,255))
bf=font('Bold',40); bt='Розберемо вашу ситуацію'; bw=dr.textlength(bt,font=bf)
dr.rounded_rectangle([(W-bw)/2-44,y0+310,(W+bw)/2+44,y0+410],radius=50,fill=DARK)
dr.text(((W-bw)/2,y0+333),bt,font=bf,fill=WHITE)
ctext('Kropka PL · центр Катовіце',font('SemiBold',36),y0+455,(110,114,120,255))
shadow_layer(img,blur=26,alpha=120,off=(0,12)).save('ov/end.png')

subprocess.run(['ffmpeg','-v','error','-y','-ss','16.30','-i',SRC,'-frames:v','1','-vf','crop=608:1080:656:0','end.png'],check=True)
inputs=['-i',SRC,'-loop','1','-t',str(END),'-i','end.png']
ov=[('ov/hook.png',0,out_t(3.25),True),('ov/phone.png',0,MAIN,False)]+[(p,a,b,False) for p,a,b in caps]+[('ov/end.png',MAIN,TOTAL,True)]
for p,_,_,_ in ov: inputs+=['-loop','1','-t',f'{TOTAL:.2f}','-i',p]
fc=[];vl=[]
for i,(a,b,z) in enumerate(SEGS):
    vf="crop=544:967:688:40,scale=1080:1920:flags=lanczos,unsharp=5:5:0.6" if z else "crop=608:1080:656:0,scale=1080:1920:flags=lanczos,unsharp=5:5:0.5"
    fc.append(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS,{vf},setsar=1,fps=30[v{i}]")
    fc.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st={b-a-0.04:.3f}:d=0.04[a{i}]")
    vl.append(f"[v{i}][a{i}]")
fc.append(f"[1:v]scale=1080:1920,setsar=1,boxblur=22:2,eq=brightness=-0.22:saturation=0.8,fps=30,trim=0:{END},setpts=PTS-STARTPTS[vend]")
fc.append(f"anullsrc=r=48000:cl=mono,atrim=0:{END}[aend]")
fc.append("".join(vl)+f"[vend][aend]concat=n={len(SEGS)+1}:v=1:a=1[base][ac]")
cur='base'
for k,(p,a,b,fade) in enumerate(ov):
    idx=k+2
    src=f"[{idx}:v]format=rgba,fps=30"
    if fade: src+=f",fade=t=in:st={a:.2f}:d=0.25:alpha=1,fade=t=out:st={max(a,b-0.25):.2f}:d=0.25:alpha=1"
    fc.append(src+f"[o{k}]")
    fc.append(f"[{cur}][o{k}]overlay=0:0:enable='between(t,{a:.3f},{b:.3f})':format=auto[c{k}]"); cur=f"c{k}"
fc.append(f"[{cur}]format=yuv420p[vo]")
fc.append("[ac]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000,pan=stereo|c0=c0|c1=c0[ao]")
open('fc.txt','w').write(';\n'.join(fc))
subprocess.run(['ffmpeg','-v','error','-y',*inputs,'-filter_complex_script','fc.txt','-map','[vo]','-map','[ao]','-t',f'{TOTAL:.2f}','-c:v','libx264','-preset','medium','-crf','19','-profile:v','high','-c:a','aac','-b:a','160k','-movflags','+faststart','kreo_2_vidmova.mp4'],check=True)
print('done',round(TOTAL,2))
