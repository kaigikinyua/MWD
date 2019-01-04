import time
import sys
keys=["a","s","d","f","e","w","t","v","n","j"];
def enc():
	f=open("num.txt","r")
	x=f.readlines()
	f.close()
	num=[0,1,2,3,4,5,6,7,8,9]
	encNum=""
	total=0;
	completed=0
	for i in range(len(x)):
		total+=len(x[i])
	for i in range(len(x)):
		for j in range(len(x[i])):
			for k in range(10):
				if (x[i][j]==str(num[k]) or x[i][j]=="\n"):
					if(x[i][j=="\n"]):
						encNum+="\n"
					else:
						encNum+=keys[k]
				completed=len(encNum)
		progress(total,completed)
	print("\n")
	t=open("encNum.txt","w")
	t.write(encNum)
	t.close()

def progress(total,comp):
	percentage=int((comp*100)/total)
	if(total<comp):
		percentage=100
	sys.stdout.write("\r Encrypting ---- percentage "+str(percentage)+"% Done "+"|"*int(percentage/10))
	time.sleep(0.5)
	sys.stdout.flush()
enc()

