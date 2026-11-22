#include <stdio.h>

int main()
{
    int n, i;
    float grade, sum = 0, average;

    printf("===== STUDENT GRADE MANAGER =====\n");

    printf("Enter number of grades: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++)
    {
        printf("Enter grade: ");
        scanf("%f", &grade);

        sum = sum + grade;
    }

    average = sum / n;

    printf("Average = %.2f\n", average);

    if(average >= 10)
        printf("Result: Passed\n");
    else
        printf("Result: Failed\n");

    return 0;
}
