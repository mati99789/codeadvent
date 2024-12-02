from utils.readFile import read_file

lines = read_file("./input.txt")

leftList = []
rightList = []


for line in lines:
    leftList.append(line.split()[0])
    rightList.append(line.split()[1])


leftList.sort()
rightList.sort()

total = 0

for i in range(len(leftList)):
    count = 0
    total += abs(int(leftList[i]) - int(rightList[i]))

secondAnswer = 0
for i in range(len(leftList)):
    count = 0

    for j in range(len(leftList)):
        if leftList[i] == rightList[j] and leftList[i] != 0:
            count += 1

    secondAnswer += int(leftList[i]) * count


print(total)
print(secondAnswer)