class Hash:
	def __init__(self):
		try:
			f=open("keys","r")
			self.r=f.readlines()
			f.close()
			m=raw_input("1.Encrypt\n2.Decrypt\n")
			if(int(m)==1):
				ms=raw_input("Enter message\n")
				self.hash(ms)
			elif(int(m)==2):
				ms=raw_input("Enter message\n")
				self.rvHash(ms)
			else:
				print ("-------Unknown input------")
		except():
			print ("Error in reading the files")
	def hash(self,message):
		enMessage="";
		message=message.lower()
		for item in message:
			c=0;
			for v in self.r[0]:
				if(item==v):
					enMessage+=self.r[1][c]
				c+=1
		f=open("message","w")
		f.write(enMessage)
		f.close()
	def rvHash(self,enMessage):
		message="";
		for item in enMessage:
			c=0;
			for v in self.r[1]:
				if(item==v):
					message+=self.r[0][c]
				c+=1
		f=open("deMessage","w")
		f.write(message)
		f.close()
l=Hash()

