import random


print('Welcome to password generator')

chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#@0123456789'

number = input('Quantas senhas devem ser geradas? ')
number = int(number)

length = input('Qual o tamanho das senhas a serem geradas? ')
length = int(length)

print('Aqui está')

for pwd in range(number):
    passwords = ''
    for c in range(length):
        passwords += random.choice(chars)
    print(passwords)