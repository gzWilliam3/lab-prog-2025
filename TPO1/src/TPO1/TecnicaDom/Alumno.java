/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom;

/**
 *
 * @author G16
 */
public class Alumno implements Comparable {

    private String nombre;
    private String apellido;
    private final int legajo;

    public Alumno(String nombre, String apellido, int legajo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.legajo = legajo;
    }

    public Alumno(int legajo) {
        this.legajo = legajo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public String getApellido() {
        return this.apellido;
    }

    public int getLegajo() {
        return this.legajo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    @Override
    public int compareTo(Object otroAlumno) {
        return this.apellido.compareToIgnoreCase(((Alumno) otroAlumno).getApellido());
    }

    @Override
    public String toString() {
        return this.nombre + " " + this.apellido + " " + this.legajo;
    }

    @Override
    public boolean equals(Object otroAlumno) {
        return this.legajo == ((Alumno) otroAlumno).getLegajo();
    }

}
