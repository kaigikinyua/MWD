#generate numbers for as input to a file
import random
def rNum():
	x=random.randint(1,999999999)
	return x
f=open("num.txt","w");
for i in range(1000):
	a=rNum()
	w=str(a);
	if((i%100)==0):
		w+="\n"
	f.write(w);
f.close()
