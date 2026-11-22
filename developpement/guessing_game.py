import random

print("===== GUESSING GAME =====")

secret_number = random.randint(1, 10)
guess = 0

while guess != secret_number:
    guess = int(input("Guess a number between 1 and 10: "))

    if guess < secret_number:
        print("Too low!")
    elif guess > secret_number:
        print("Too high!")
    else:
        print("Congratulations! You found the number.")
