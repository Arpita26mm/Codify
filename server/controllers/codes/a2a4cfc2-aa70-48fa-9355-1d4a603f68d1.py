import math

def factorial_of_product(i, j, k):
    product =math.factorial(i)*math.factorial(j)*math.factorial(k)
    return product
    
# Example usage
i = int(input())
j = int(input())
k = int(input())

result = factorial_of_product(i, j, k)
print(f"{result}")
