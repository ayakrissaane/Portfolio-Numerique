#include <stdio.h>

int main()
{
    char text[200];
    char letter;
    int i, characters = 0, spaces = 0, found = 0;

    printf("===== TEXT TOOLKIT =====\n");

    printf("Enter a text: ");
    fgets(text, sizeof(text), stdin);

    printf("Enter a letter to search: ");
    scanf(" %c", &letter);

    for(i = 0; text[i] != '\0' && text[i] != '\n'; i++)
    {
        characters++;

        if(text[i] == ' ')
            spaces++;

        if(text[i] == letter)
            found = 1;
    }

    printf("Characters = %d\n", characters);
    printf("Spaces = %d\n", spaces);

    if(found == 1)
        printf("Letter found!\n");
    else
        printf("Letter not found!\n");

    return 0;
}
