#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>

// constants
#define MAX_NAME_LENGTH 10
#define MAX_LINE_LENGTH 100

// hash map typedef struct
typedef struct {
    char gateName[MAX_NAME_LENGTH];
    int value;  // the computed value of the gate
    int isComputed; // 1 if the gate is computed
    char inputs[2][MAX_NAME_LENGTH]; // up to 2 inputs for each gate
    char gateType[MAX_NAME_LENGTH]; // type of logic gate OR "RESULT" if its X
} Gate;

// hash map for storing gates
Gate gates[100];
int gateCount = 0;
int Xindex;

// array of all supported gate types (order of gates matter when using strstr function when adding gate types)
char *supportedGateTypes[] = {"NOT", "NAND", "AND", "XNOR", "XOR", "NOR", "OR" };
int supportedGateTypeCount = 7; // hard coded number of gate types

// array of all supported variables
char supportedVariables[] = {'a', 'b', 'c', 'd'};

// function to add a gate to the system
void addGate(char *gateName, char *input1, char *gateType) {
    strcpy(gates[gateCount].gateName, gateName);
    strcpy(gates[gateCount].inputs[0], input1);
    strcpy(gates[gateCount].gateType, gateType);
    gates[gateCount].isComputed = 0;

    if (strcmp(gateType, "RESULT") == 0) {
        Xindex = gateCount;
    }
    gateCount++;
}

int NOT(int x) { return !x; }

int AND(int x, int y) { return x & y; }

int NAND(int x, int y) { return !(x & y); }

int OR(int x, int y) { return x | y; }

int NOR(int x, int y) { return !(x | y); }

int XOR(int x, int y) { return x ^ y; }

int XNOR(int x, int y) { return x == y ? 1 : 0; }

// uses topological sort (Kahn's algorithm) to solve a DAG problem
int solveX(int a, int b, int c, int d) {
    for (int i = 0; i < gateCount; i++) {
        gates[i].isComputed = 0;
        gates[i].value = 0;
    }

    int count = 0;

    while (gates[Xindex].isComputed == 0 && count < 10) {
        count++;

        // check every node with 0 incoming edges and solve them
        for (int i = 0; i < gateCount; i++) {
            // attempt to compute nodes with > 0 incoming edges
            if (gates[i].isComputed == 0) {
                // NOT Gate case
                if (strcmp(gates[i].gateType, "NOT") == 0 && strlen(gates[i].inputs[0]) > 0) {
                    // check if its variable a, b, c or d
                    for (size_t j = 0; j < sizeof(supportedVariables) / sizeof(supportedVariables[0]); j++) {
                        char str_choice[3] = {supportedVariables[j], '\0'};
                        if (strcmp(gates[i].inputs[0], str_choice) == 0) {
                            switch (supportedVariables[j]) {
                                case 'a': gates[i].value = NOT(a); break;
                                case 'b': gates[i].value = NOT(b); break;
                                case 'c': gates[i].value = NOT(c); break;
                                case 'd': gates[i].value = NOT(d); break;
                            }
                            gates[i].isComputed = 1;
                            break;
                        }
                    }

                    // check if the incoming edge is computed
                    for (int j = 0; j < gateCount; j++) {
                        if (strcmp(gates[j].gateName, gates[i].inputs[0]) == 0 && gates[j].isComputed == 1) {
                            gates[i].value = NOT(gates[j].value);
                            gates[i].isComputed = 1;
                        }
                    }
                }
                // all other supported Gates cases
                else if (strcmp(gates[i].gateType, "NOT") != 0 && strlen(gates[i].inputs[1]) > 0) {
                    int gate_inputs[2] = {-1, -1};

                    // check both inputs
                    for (int j = 0; j < 2; j++) {
                        // check if it's variable a, b, c, or d
                        for (size_t k = 0; k < sizeof(supportedVariables) / sizeof(supportedVariables[0]); k++) {
                            char str_choice[3] = {supportedVariables[k], '\0'};
                            if (strcmp(gates[i].inputs[j], str_choice) == 0) {
                                switch (supportedVariables[k]) {
                                    case 'a': gate_inputs[j] = a; break;
                                    case 'b': gate_inputs[j] = b; break;
                                    case 'c': gate_inputs[j] = c; break;
                                    case 'd': gate_inputs[j] = d; break;
                                }
                                // printf("variable: %c, inputs: %d, %d\n", supportedVariables[k], gate_inputs[0], gate_inputs[1]);
                            }
                        }

                        // check if the incoming edge is computed
                        for (int k = 0; k < gateCount; k++) {
                            if (strcmp(gates[k].gateName, gates[i].inputs[j]) == 0 && gates[k].isComputed == 1) {
                                gate_inputs[j] = gates[k].value;
                                // printf("Gate name: %s, value: %d\n", gates[k].gateName, gates[k].value);
                            }
                        }
                    }

                    if (gate_inputs[0] != -1 && gate_inputs[1] != -1) {
                        // if statements for all supported logic gates and apply the respective function
                        if (strcmp(gates[i].gateType, "AND") == 0) {
                            gates[i].value = AND(gate_inputs[0], gate_inputs[1]);
                            // printf("AND applied\n");
                        }
                        else if (strcmp(gates[i].gateType, "NAND") == 0) {
                            gates[i].value = NAND(gate_inputs[0], gate_inputs[1]);
                            // printf("NAND applied\n");
                        }
                        else if (strcmp(gates[i].gateType, "OR") == 0) {
                            gates[i].value = OR(gate_inputs[0], gate_inputs[1]);
                            // printf("OR applied\n");
                        }
                        else if (strcmp(gates[i].gateType, "NOR") == 0) {
                            gates[i].value = NOR(gate_inputs[0], gate_inputs[1]);
                            // printf("NOR applied\n");
                        } 
                        else if (strcmp(gates[i].gateType, "XOR") == 0) {
                            gates[i].value = XOR(gate_inputs[0], gate_inputs[1]);
                            // printf("XOR applied\n");
                        }
                        else if (strcmp(gates[i].gateType, "XNOR") == 0) {
                            gates[i].value = XNOR(gate_inputs[0], gate_inputs[1]);
                            // printf("XNOR applied\n");
                        }
                        gates[i].isComputed = 1;
                        // printf("gate type: %s, %d, %d, derived: %d\n", gates[i].gateType, gate_inputs[0], gate_inputs[1], gates[i].value);
                    }
                }
                else if (strcmp(gates[i].gateType, "RESULT") == 0) {
                    for (int j = 0; j < gateCount; j++) {
                        if (strcmp(gates[j].gateName, gates[i].inputs[0]) == 0 && gates[j].isComputed == 1) {
                            gates[i].value = gates[j].value;
                            gates[i].isComputed = 1;
                        }
                    }
                }
            }
            // print gate and its properties
            // printf("Gate: %s, Inputs: %s, %s, Value: %d, Computed: %d\n", gates[i].gateName, gates[i].inputs[0], gates[i].inputs[1], gates[i].value, gates[i].isComputed);
        }
        // printf("\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n\n");
    }

    return gates[Xindex].value;
}

int main() {
    FILE *file = fopen("logic_circuit.txt", "r");
    if (file == NULL) {
        printf("Error opening file!\n");
        return 1;
    }

    char line[MAX_LINE_LENGTH];

    // read each line from the file
    // fill up hash map with txt file data
    while (fgets(line, sizeof(line), file)) {
        // remove the newline character at the end, if present
        line[strcspn(line, "\n")] = '\0';

        // split using " -> " as the delimiter
        char *source = strtok(line, " -> ");
        char *target = strtok(NULL, " -> ");

        // check if source and target are correctly split
        if (source && target) {
            printf("Source: %s, Target: %s\n", source, target);
        }

        // check if gate already exists in hash map
        int gateExists = 0;
        for (int i = 0; i < gateCount; i++) {
            if (strcmp(gates[i].gateName, target) == 0) {
                // if gate exists and is not a NOT gate, add 2nd input
                gateExists = 1;
                if (strlen(gates[i].inputs[1]) == 0 && strcmp(gates[i].gateType, "NOT") != 0) {
                    strcpy(gates[i].inputs[1], source);
                    // printf("Gate name: %s, Input 2: %s\n", target, source);
                }
            }
        }

        // add gate if it doesnt exist
        if (!gateExists) {
            for (int j = 0; j < supportedGateTypeCount; j++) {
                if (strstr(target, supportedGateTypes[j])) {
                    addGate(target, source, supportedGateTypes[j]);
                    // printf("Gate name: %s, Input 1: %s, Gate type: %s\n", target, source, supportedGateTypes[j]);
                    break;
                }
            }
            
            if (strcmp(target, "x") == 0) {
                addGate(target, source, "RESULT");
            }
        }
    }
    printf("Gate Count: %d\n", gateCount);
    fclose(file);

    // compute the values of the gates
    // loop through the hash map and if the dependencies are known, calculate the value
    int numVariables = 4;
    int variables[] = {0, 0, 0, 0};
    // solveX(variables[0], variables[1], variables[2], variables[3]);

    printf("D | C | B | A | X \n");
    // printf("%d | %d | %d | %d | %d \n", variables[3] ,variables[2], variables[1], variables[0], solveX(variables[0], variables[1], variables[2], variables[3]));

    for (int i = 0; i < pow(2, numVariables); i++) {
        
        printf("%d | %d | %d | %d | %d \n", variables[3] ,variables[2], variables[1], variables[0], solveX(variables[0], variables[1], variables[2], variables[3]));
        
        // increment LSB
        variables[0]++;

        // iterate over the variables and increment the variables accordingly if necessary
        for (long long unsigned int j = 0; j < sizeof(variables)/sizeof(variables[0]); j++) {
            // determine if current index is the MSB
            if (j != sizeof(variables) / sizeof(variables[0])) {
                // set current variable to 0 and increment next variable
                if (variables[j] == 2 ) {
                    variables[j] = 0;
                    variables[j+1]++;
                }
            }
        }
    }

    return 0;
}

// NOTES: improve sorting of hash map to order the keys like the queue for the topo sort