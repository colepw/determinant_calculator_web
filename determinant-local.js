const prompt = require('prompt-sync')();

let matrix = [];
let size = 0;

while ((size <= 0) || (size > 20) || (isNaN(size))) {
    size = +prompt("Enter the size of the matrix: ");
}

for (let i = 0; i < size; i++) { // Create matrix
    let row = [];
    for (let j = 0; j < size; j++) {
        let element = prompt(`Enter element in position (${i + 1}, ${j + 1}): `);
        while (isNaN(element)) element = prompt(`Enter element in position (${i + 1}, ${j + 1}): `);
        row.push(+element); // Convert char to int
    }

    matrix.push(row);
}

for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i]);
}

let determinant = calcDeterminant(matrix);
console.log(`Determinant = ${determinant}`);

export function calcDeterminant(matrix) {
    const rank = matrix.length;
    if (rank == 1) {
        return matrix[0][0];
    }

    let determinant = 0;
    for (let i = 0; i < rank; i++) {
        let A = [];
        for (let j = 1; j < rank; j++) {
            let row =[];
            for (let k = 0; k < rank; k++) {
                if (k == i) continue;
                row.push(matrix[j][k]);
            }

            A.push(row);
        }
        determinant += ((-1) ** ((i + 1) + 1)) * matrix[0][i] * calcDeterminant(A);
    }

    return determinant;
}