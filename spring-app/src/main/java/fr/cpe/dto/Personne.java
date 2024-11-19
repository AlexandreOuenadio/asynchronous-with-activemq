package fr.cpe.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Personne {
    public String name;
    public String firstname;
    public String spring;

    public void setSpring(String spring) {
        this.spring = spring;
    }



    public String getName() {
        return name;
    }

    public String getFirstname() {
        return firstname;
    }

    @Override
    public String toString() {
        return "Personne{" +
                "name='" + name + '\'' +
                ", firstname='" + firstname + '\'' +
                '}';
    }
}
