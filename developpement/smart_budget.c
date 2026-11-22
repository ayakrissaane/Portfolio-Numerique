#include <stdio.h>

int main()
{
    int n, i;
    float budget, expense, total = 0, remaining;

    printf("===== SMART BUDGET CALCULATOR =====\n");

    printf("Enter your budget: ");
    scanf("%f", &budget);

    printf("How many expenses? ");
    scanf("%d", &n);

    for(i = 0; i < n; i++)
    {
        printf("Enter expense: ");
        scanf("%f", &expense);

        total = total + expense;
    }

    remaining = budget - total;

    printf("Total expenses = %.2f\n", total);

    if(remaining >= 0)
        printf("Remaining budget = %.2f\n", remaining);
    else
        printf("Budget exceeded by %.2f\n", -remaining);

    return 0;
}
