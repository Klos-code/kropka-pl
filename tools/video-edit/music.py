import numpy as np, wave
SR=48000; BPM=76; beat=60/BPM; bar=4*beat
def n2f(n): return 440*2**((n-69)/12)
# progression in C major: Cmaj9, Am7, Fmaj7, G6 (soft)
prog=[[48,55,64,67,74],[45,52,60,64,67],[41,48,57,64,69],[43,50,59,62,64]]
arp=[[72,76,79,74],[69,72,76,79],[69,72,77,76],[71,74,79,76]]
bars=10; L=int(SR*bar*bars)+SR*4
out=np.zeros((L,2))
t=np.arange(L)/SR
def env_pad(n):
    a=int(1.2*SR); r=int(1.6*SR); e=np.ones(n); e[:a]=np.linspace(0,1,a); e[-r:]*=np.linspace(1,0,r); return e
rng=np.random.default_rng(3)
for b in range(bars):
    ch=prog[b%4]; s=int(b*bar*SR); n=int((bar+1.6)*SR); tt=np.arange(n)/SR; e=env_pad(n)
    for i,m in enumerate(ch):
        f=n2f(m); sig=np.zeros(n)
        for det in (-0.12,0,0.12):
            ff=f*2**(det/12/8); sig+=np.sin(2*np.pi*ff*tt+rng.random()*6)+0.18*np.sin(2*np.pi*2*ff*tt)
        sig*=e*0.05; pan=0.3+0.4*(i/len(ch))
        out[s:s+n,0]+=sig*(1-pan); out[s:s+n,1]+=sig*pan
    # soft piano-like arpeggio, 8th notes
    for k in range(8):
        m=arp[b%4][k%4]+(12 if k>=4 and k%2==0 else 0)
        st=s+int(k*beat/2*SR); n2=int(2.5*SR); tt=np.arange(n2)/SR; f=n2f(m)
        sig=(np.sin(2*np.pi*f*tt)+0.35*np.sin(2*np.pi*2*f*tt)+0.12*np.sin(2*np.pi*3*f*tt))*np.exp(-tt*2.4)*(1-np.exp(-tt*200))
        sig*=0.06*(0.8+0.2*rng.random()); pan=0.35+0.3*rng.random()
        out[st:st+n2,0]+=sig*(1-pan); out[st:st+n2,1]+=sig*pan
# bass
for b in range(bars):
    s=int(b*bar*SR); n=int(bar*SR); tt=np.arange(n)/SR; f=n2f(prog[b%4][0]-12)
    out[s:s+n]+= (np.sin(2*np.pi*f*tt)*np.minimum(1,tt*4)*np.minimum(1,(bar-tt)*4)*0.08)[:,None]
out/=np.max(np.abs(out))*1.15
with wave.open('music_raw.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype('<i2').tobytes())
print('len',round(L/SR,1))
