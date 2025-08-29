import { calcDeterminant, calcTranspose } from './determinant.js';

const dimensionsInput = document.getElementById('dimensions');
const dimMin = dimensionsInput.min;
const dimMax = dimensionsInput.max;
const matrixDiv = document.querySelector('.matrix');
const calcDeterminantButton = document.querySelector('#calculate');
const outputsDiv = document.querySelector('.outputs');
const inputMatrix = document.getElementById('input-matrix');
const outputDeterminant = document.getElementById('output-determinant');
const outputTranspose = document.getElementById('output-transpose');

let size = dimensionsInput.value;

console.log("Min: " + dimMin);
console.log("Max: " + dimMax);

function getDim() {
    size = dimensionsInput.value;

    if (size === "") {
        console.log("Dimension field empty");
        return;
    }

    size = +size;

    if (size < +dimMin) size = +dimMin;
    if (size > +dimMax) size = +dimMax;

    dimensionsInput.value = size;

    console.log(size);

    matrixDiv.innerHTML = "";
    for (let i = 0; i < size; i++) {
        let rowHTML = `<div class="row" data-row="${i}"></div>`;
        for (let j = 0; j < size; j++) {
            rowHTML += `<input type="number" name="element" class="element" id="${i}${j}" data-i="${i}" data-j="${j}">`; // Access using elementInput.dataset.i/j
        }

        matrixDiv.innerHTML += rowHTML;
    }
    console.log(matrixDiv.innerHTML);
}

function generateMatrix() {
    let A = []; // Parameter representation of user inputs
    inputMatrix.innerHTML = "$$ \\text{A} = \\begin{bmatrix} ";
    const elements = document.getElementsByClassName('element');
    for (let i = 0; i < size; i++) {
        let tempRow = [];
        for (let j = i * size; j < (i + 1) * size; j++) {
            if (elements[j].value === "") {
                console.log("Matrix must be full");
                alert("Matrix must be full");
                inputMatrix.innerHTML = outputDeterminant.innerHTML = outputTranspose.innerHTML = "";
                return;
            }
            tempRow.push(+elements[j].value);
            inputMatrix.innerHTML += (elements[j].value + " ");
            if (j == (i + 1) * size - 1 && i != size - 1) {
                inputMatrix.innerHTML += "\\\\";
            } else if (j != (i + 1) * size - 1) {
                inputMatrix.innerHTML += "& ";
            }
        }
        A.push(tempRow);
    }
    inputMatrix.innerHTML += "\\end{bmatrix} $$";
    if (size == 1) inputMatrix.innerHTML = `$$ \\text{A} = ${A[0][0]} $$`;
    MathJax.typesetPromise([inputMatrix]);
    
    for (let i = 0; i < A.length; i++) {
        console.log(A[i]);
    }
    console.log("Passing matrix A into calcDeterminant function...");
    
    outputDeterminant.innerHTML = `$$ \\text{det(A)} = ${calcDeterminant(A)} $$`;
    MathJax.typesetPromise([outputDeterminant]);

    if (size == 1) {
        outputTranspose.innerHTML = `$$ \\text{A}^{T} = ${A[0][0]} $$`;
        MathJax.typesetPromise([outputTranspose]);
        return;
    }

    let A_T = calcTranspose(A);
    outputTranspose.innerHTML = "$$ \\text{A}^{T} = \\begin{bmatrix} ";
    for (let i = 0; i < size; i++) {
        let tempRow = A_T[i];
        for (let j = 0; j < size; j++) {
            outputTranspose.innerHTML += `${tempRow[j]} `;
            if (j != size - 1) {
                outputTranspose.innerHTML += "& ";
            } else if (i != size - 1) {
                outputTranspose.innerHTML += "\\\\";
            }
        }
    }
    outputTranspose.innerHTML += "\\end{bmatrix} $$";
    // if (size == 1) outputTranspose.innerHTML = `$$ \\text{A}^{T} = ${A[0][0]} $$`;
    MathJax.typesetPromise([outputTranspose]);
}

dimensionsInput.addEventListener('input', getDim);
calcDeterminantButton.addEventListener('click', generateMatrix);
