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

    console.log("Determinant calculated!");
    return determinant;
}