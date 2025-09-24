package TPO1.Patron;

/**
 *
 * @author g16
 */

// Clase Producto Concreto. Define el comportamiento de las materias de tipo Prog
public class M_Programacion implements Materia{
    private String nombreMateria = "";
    private String departamento = "Programacion";
    private String apellidoProfesor = "";
    private int cantProyectosAsignados = 0;
    
    // Getters
    public String getNombre(){
        return nombreMateria;
    }
    
    public String getDpto(){
        return departamento;
    }
    
    public String getProfesor(){
        return apellidoProfesor;
    }
    
    public String getDatos(){
        return "Materia: " + nombreMateria +  " - Dpto: " + departamento + " - Profesor: " + apellidoProfesor;
    }
    
    // Setters
    public void setNombre(String nombre){
        nombreMateria = nombre;
    }
    
    public void setProfesor(String profesor){
        apellidoProfesor = profesor;
    }
    
    // Comportamiento particular
    public String asignarProyectoProgramacion(){
        cantProyectosAsignados++;
        return "La materia "+nombreMateria+" ha asignado proyectos.";
    }
}
