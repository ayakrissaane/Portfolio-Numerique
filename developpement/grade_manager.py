print("===== GRADE MANAGER =====")

number = int(input("How many grades? "))

total = 0

for i in range(number):
    grade = float(input("Enter a grade: "))
    total = total + grade

average = total / number

print("Average:", average)

if average >= 10:
    print("Result: Passed")
else:
    print("Result: Failed")
