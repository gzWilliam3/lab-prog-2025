package TPO1.Patron;

/**
 * @author gnzlz
 */
public class ProgramacionFactory implements MateriaFactory{
    // Clase Factory Concreta.
    
    // Redefine constructores implementados en la interfaz Factory padre
    @Override
    public Materia crearMateria(){
        return new M_Programacion();
    }
    
    @Override
    public Materia crearMateria(String nombre, String prof){
        Materia m = new M_Programacion();
        m.setNombre(nombre);
        m.setProfesor(prof);
        
        return m;
    }
}
