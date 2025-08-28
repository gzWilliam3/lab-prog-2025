/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom;

import TPO1.TecnicaDom_EDT.ArbolAVL;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.StringTokenizer;

/**
 *
 * @author santt
 */
public class Log {

    public static void escribir(String entrada) {

        try (BufferedWriter output = new BufferedWriter(new FileWriter("C:\\Users\\gnzlz\\OneDrive\\Documentos\\NetBeansProjects\\LabProg\\src\\TPO1\\Dom2\\log.txt", true))) {
            output.write(entrada);
            output.newLine();

            //output.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void leer(ArbolAVL alumnos) {

        try (BufferedReader input = new BufferedReader(new FileReader("C:\\Users\\gnzlz\\OneDrive\\Documentos\\NetBeansProjects\\LabProg\\src\\TPO1\\Dom2\\data.txt"))) {

            String str;
            while ((str = input.readLine()) != null) {
                cargarDatos(str, alumnos);
            }

            //input.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void cargarDatos(String linea, ArbolAVL alumnos) {

        /*
        StringTokenizer atributo = new StringTokenizer(linea, ";"); //divido la linea
        String nombre = atributo.nextToken().trim().toUpperCase();
        String apellido = atributo.nextToken().trim().toUpperCase();
        int legajo = Integer.parseInt(atributo.nextToken().trim());
        */

        String[] atributos = linea.split(";");
        if (atributos.length == 3) { // Verificamos que la línea tenga 3 partes
            String nombre = atributos[0].trim().toUpperCase();
            String apellido = atributos[1].trim().toUpperCase();
            int legajo = Integer.parseInt(atributos[2].trim());

            Alumno alumno = new Alumno(nombre, apellido, legajo);

            if (alumnos.insertar(alumno)) {
                escribir("Alumno cargado: " + alumno);
            }
        }
    }
}
