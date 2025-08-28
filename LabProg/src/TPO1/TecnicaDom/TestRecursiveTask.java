/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom;

import TPO1.TecnicaDom_EDT.ArbolAVL;

/**
 *
 * @author santt
 */
public class TestRecursiveTask {

    public static void main(String[] args) {
        ArbolAVL alumnos = new ArbolAVL();
        int legajo = 8541;

        Log.leer(alumnos);

        Alumno elAlumno = new Alumno(legajo);
        System.out.println("El alumno es: " + elAlumno.toString());
        System.out.println("Buscando alumno con legajo: " + legajo + "..." );
        //System.out.println(alumnos.toString());

        boolean encontrado = alumnos.buscarParalelo(elAlumno, 3);
        System.out.println("Elemento encontrado: " + encontrado);
    }
}
