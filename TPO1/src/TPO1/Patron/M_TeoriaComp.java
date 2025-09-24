package TPO1.Patron;

/**
 *
 * @author gnzlz
 */

// Clase Producto Concreto. Define el comportamiento de las materias de tipo TC
public class M_TeoriaComp implements Materia{
    private String nombreMateria = "";
    private String departamento = "Teoria de Comp.";
    private String apellidoProfesor = "";
    private int automatasFinitosEvaluados = 0;
    
    // getters
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
    
    // setters
    public void setNombre(String nombre){
        nombreMateria = nombre;
    }
    
    public void setProfesor(String profesor){
        apellidoProfesor = profesor;
    }
    
    // comportamiento particular
    public String evaluarAutomatas(){
        automatasFinitosEvaluados++;
        return "La materia " +nombreMateria + " ha evaluado automatas";
    }
}
