package TPO1.Patron;

/**
 *
 * @author gnzlz
 */

// Clase Producto Concreto. Define el comportamiento de las materias de tipo Ing. Soft
public class M_IngSoft implements Materia{
    private String nombreMateria = "";
    private String departamento = "Ing. Software";
    private String apellidoProfesor = "";
    private int casosDeUsoDiagramados = 0;
    
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
    public String diagramarCasosDeUso(){
        casosDeUsoDiagramados++;
        return "La materia "+ nombreMateria + " ha diagramado casos de uso";
    }
}
