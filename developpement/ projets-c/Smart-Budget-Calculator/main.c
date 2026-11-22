
#include <stdio.h>

// Function to calculate total expenses
float calculerTotal(float depenses[], int n)
{
    float total = 0;
    int i;

    for (i = 0; i < n; i++)
    {
        total = total + depenses[i];
    }

    return total;
}

int main()
{
    float budget, depenses[10];
    float total, reste;
    int n, i;

    printf("================================\n");
    printf("      SMART BUDGET CALCULATOR\n");
    printf("================================\n");

    printf("Enter your budget: ");
    scanf("%f", &budget);

    while (budget < 0)
    {
        printf("Invalid budget! Enter a positive value: ");
        scanf("%f", &budget);
    }

    printf("Enter the number of expenses (1-10): ");
    scanf("%d", &n);

    while (n < 1 || n > 10)
    {
        printf("Invalid number! Enter a value between 1 and 10: ");
        scanf("%d", &n);
    }

    // Enter expenses
    for (i = 0; i < n; i++)
    {
        printf("Enter expense %d: ", i + 1);
        scanf("%f", &depenses[i]);

        while (depenses[i] < 0)
        {
            printf("Invalid expense! Enter a positive value: ");
            scanf("%f", &depenses[i]);
        }
    }

    // Calculate total and remaining budget
    total = calculerTotal(depenses, n);
    reste = budget - total;

    // Display results
    printf("\n------ Budget Summary ------\n");
    printf("Initial budget: %.2f\n", budget);
    printf("Total expenses: %.2f\n", total);
    printf("Remaining budget: %.2f\n", reste);

    if (reste >= 0)
    {
        printf("Status: Budget under control!\n");
    }
    else
    {
        printf("Status: You exceeded your budget!\n");
    }

    return 0;
}
