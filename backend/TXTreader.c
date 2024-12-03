#include <stdio.h>
#include <string.h>

#define MAX_LINE_LENGTH 100

int main() {
    FILE *file = fopen("logic_circuit.txt", "r");
    if (file == NULL) {
        printf("Error opening file!\n");
        return 1;
    }

    char line[MAX_LINE_LENGTH];

    // Read each line from the file
    while (fgets(line, sizeof(line), file)) {
        // Remove the newline character at the end, if present
        line[strcspn(line, "\n")] = '\0';

        // Split using " -> " as the delimiter
        char *source = strtok(line, " -> ");
        char *target = strtok(NULL, " -> ");

        // Check if source and target are correctly split
        if (source && target) {
            printf("Source: %s, Target: %s\n", source, target);
        }
    }

    fclose(file);
    return 0;
}