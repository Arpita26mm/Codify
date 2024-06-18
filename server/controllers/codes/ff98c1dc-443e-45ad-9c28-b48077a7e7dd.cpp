import math

def factorial_of_product(i, j, k):
    product = i * j * k
    return math.factorial(product)

# Example usage
i = int(input())
j = int(input())
k = int(input())

result = factorial_of_product(i, j, k)
print(f"{result}")
