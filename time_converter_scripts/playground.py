# string = "01:45"
#
# print("changing : -> -")
# newStr = string[:2] + "-" + string[-2:]
# print(newStr)
#
# print("some other tests")
# print(string[:2])
# print(string[-3:])
# print(string[0])
#
# print(int(string[0]) + 2)
#
# print(str(int(string[0:2]) + 2) + "hello")


# TO generate uid
import datetime
name = "Al Aqsa Masjid"
d = datetime.datetime.strptime("12-Apr-23", "%d-%b-%y")
s = d.strftime('%Y-%m-%d')

words = name.split()
first_letters = [word[0].upper() for word in words]
uid = ''.join(first_letters) + '-' + s
print(uid)