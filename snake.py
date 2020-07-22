
from pygame import *
import random
from tkinter import *
rt=Tk()
score=0
lbl=Label(rt,text="dead")

win=display.set_mode((500,500))
win.fill((0,0,0))

class box:
    def __init__(self,x,y,col):
        self.x=x+1
        self.y=y+1
        self.col=col
        self.color=0
        if self.col==1:
            self.color=(255,0,0)
        elif self.col==2:
            self.color=(255,255,0)
        elif self.col==3:
            self.color=(120,32,57)
        else:
            self.color=(0,0,0)
        draw.rect(win,self.color,(15*self.x,15*self.y,15,15))

z=[[box(k,n,0) for k in range(30)] for n in range(30)]
for n in range(30):
    for k in range(30):
        z[n][k]=box(n,k,2)
display.update()

a=random.randint(10,20)
b=random.randint(10,20)
z[a][b]=box(a,b,0)
display.update()
dir=random.randint(0,4)
length=2
snakex=[]
snakey=[]
def food():
    c=random.randint(5,25)-1
    d=[]
    for n in range(28):
        if z[c][n].col==2:
            d.append(n)
    if len(d)!=0:
        k=random.randint(1,len(d))-1
        return str(c)+' '+str(k)
    else:
        food()
p=food().split()
a1=int(p[0])
b1=int(p[1])
z[a1][b1]=box(a1,b1,3)
display.update()
while 1:
    z[a][b].col=1
    for eventx in event.get():
        if eventx.type == KEYDOWN :
            keys=key.get_pressed()
            for keyx in keys:
                if keys[K_LEFT]:
                    dir=1
                     
                elif keys[K_RIGHT]:
                    dir=0
                elif keys[K_UP]:
                    dir=2
                elif keys[K_DOWN]:
                    dir =3
                elif keys[K_ESCAPE]:
                    exit(0)
                else:
                    dir=dir

    
    if dir==0 and a<28:
        a+=1
    elif dir==1 and a>0:
        a-=1
    elif dir==2 and b>0:
        b-=1
    else:
        if b<28:
            b+=1
    snakex.append(a)
    snakey.append(b)
    if len(snakex)>length:
        z[snakex[0]][snakey[0]]=box(snakex[0],snakey[0],2)
        display.update()
        del snakex[0]
        del snakey[0]
    for n in range(len(snakex)):
        z[snakex[n]][snakey[n]]=box(snakex[n],snakey[n],0)
        display.update()
    z[a][b]=box(a,b,0)
    z[snakex[-1]][snakey[-1]]=box(snakex[-1],snakey[-1],1)
    
    if a1==snakex[-1] and b1==snakey[-1]:
        p=food().split()
        length+=1
        score+=1

        #print('eaten')
        a1=int(p[0])
        b1=int(p[1])
        try:
            z[a1][b1]=box(a1,b1,3)
        except:
            print(a1,b1)
    if a==30 or b==30 or a==-1 or b==-1:
        rt.mainloop()
    display.update()
    
    time.delay(150)
