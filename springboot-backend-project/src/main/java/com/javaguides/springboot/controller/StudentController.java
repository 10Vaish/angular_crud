package com.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaguides.springboot.exception.ResourceNotFoundException;

import com.javaguides.springboot.model.Student;
import com.javaguides.springboot.repository.StudentRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class StudentController {
	
	@Autowired
	private StudentRepository studentRepository;
	
	@GetMapping("/students")
	public List<Student> getAllStudents(){
		return studentRepository.findAll();
	}
	
	@PostMapping("/students")
	public Student createStudent(@RequestBody Student student) {
		return studentRepository.save(student);
	}
	
	@GetMapping("/students/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable Long id){
		Student student=studentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with id:"+id));
		return ResponseEntity.ok(student);
	}
	
	@PutMapping("/students/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable Long id,@RequestBody Student studentDetails){
		Student student=studentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with id:"+id));
		student.setStudentName(studentDetails.getStudentName());
		student.setDateOfBirth(studentDetails.getDateOfBirth());
		student.setBranch(studentDetails.getBranch());
		student.setYear(studentDetails.getYear());
		student.setStudentId(studentDetails.getStudentId());
		student.setInterests(studentDetails.getInterests());
		
		Student updatedStudent=studentRepository.save(student);
		return ResponseEntity.ok(updatedStudent);
	}
	
	@DeleteMapping("/students/{id}")
	public Map<String, Boolean> deleteStudent(@PathVariable Long id){
		Student student=studentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with id:"+id));
		studentRepository.delete(student);
		Map<String,Boolean> response=new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
}
