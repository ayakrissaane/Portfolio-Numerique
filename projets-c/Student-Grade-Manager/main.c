
#include <stdio.h>

// Function to display the final result
void afficherResultat(float moyenne)
{
    printf("\n------ Student Result ------\n");
    printf("Average: %.2f / 20\n", moyenne);

    if (moyenne >= 10)
    {
        printf("Status: Passed\n");
    }
    else
    {
        printf("Status: Failed\n");
    }
}

int main()
{
    float notes[10];
    float somme = 0, moyenne;
    int n, i;

    printf("================================\n");
    printf("      STUDENT GRADE MANAGER\n");
    printf("================================\n");

    printf("Enter the number of grades (1-10): ");
    scanf("%d", &n);

    while (n < 1 || n > 10)
    {
        printf("Invalid number! Enter a value between 1 and 10: ");
        scanf("%d", &n);
    }

    // Enter the grades
    for (i = 0; i < n; i++)
    {
        printf("Enter grade %d: ", i + 1);
        scanf("%f", &notes[i]);

        while (notes[i] < 0 || notes[i] > 20)
        {
            printf("Invalid grade! Enter a grade between 0 and 20: ");
            scanf("%f", &notes[i]);
        }

        somme = somme + notes[i];
    }

    // Calculate the average
    moyenne = somme / n;

    // Display the result
    afficherResultat(moyenne);

    return 0;
}
