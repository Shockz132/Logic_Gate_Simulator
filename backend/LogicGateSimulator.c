#include <stdio.h>
#include <math.h>
#include <stdbool.h>

int X, numVariables = 0;
// array of variables up to 3 variables (index 0 being the LSB)
char variables[4];

int NOT(int x) { return !x; }

int AND(int x, int y) { return x & y; }

int NAND(int x, int y) { return !(x & y); }

int OR(int x, int y) { return x | y; }

int NOR(int x, int y) { return !(x | y); }

int XOR(int x, int y) { return x ^ y; }

int XNOR(int x, int y) { return x == y ? 1 : 0; }

int main() {
    printf("How many input variables are there? (1 to 4): ");
    scanf("%d", &numVariables);

    if (numVariables < 1 || numVariables > 4) {
        printf("Invalid number of input variables. Exiting...\n");
        return 1;
    }
    else {
        for (int i = 0; i < sizeof(variables) / sizeof(variables[0]); i++) {
            variables[i] = 0;
        }
    }

    printf("Running Test Program...\n");
    printf("Generating Table...\n");
    printf("D | C | B | A | X \n");
    // generate truth table
    for (int i = 0; i < pow(2, numVariables); i++) {
        // boolean algebra equation (derive from json file)
        X = NOR(XOR(NOT(AND(variables[0], variables[1])), OR(NAND(variables[0], variables[1]), AND(variables[0], variables[1]))), XNOR(variables[1], variables[2]));
        printf("%d | %d | %d | %d | %d \n", variables[3], variables[2], variables[1], variables[0], X);

        // increment LSB
        variables[0]++;

        // iterate over the variables and increment the variables accordingly if necessary
        for (long long unsigned int i = 0; i < sizeof(variables) / sizeof(variables[0]); i++) {
            // determine if current index is the MSB
            if (i != sizeof(variables) / sizeof(variables[0])) {
                // set current variable to 0 and increment next variable
                if (variables[i] == 2 ) {
                    variables[i] = 0;
                    variables[i+1]++;
                }
            }
        }
    }

    return 0;
}