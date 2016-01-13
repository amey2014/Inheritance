(function(){

	// Person constructor
	function Person(name){
		this.name = name;
	}

	// add methods to the Person's prototype
	Person.prototype = {
	   walk: function(steps){
		   for(var i = 0; i < steps; i++){
			  console.log("Step", i+1);
		   }
	   }
	}

	// Student constructor
	function Student(name, subject){
		Person.call(this, name);
		this.subject = subject;
	}

	console.log("********************* Results without inheritance *********************");
	// create object of Student object
	var student1 = new Student("Jack", "Math");
	// test name and subject
	console.log('My name is', student1.name, 'and i am stydying', student1.subject); // My name is Jack and i am stydying Math
	// check if student1 is Student
	console.log(student1 instanceof Student); // true
	// check if student1 is Person
	console.log(student1 instanceof Person); // false
	try{
		// invoke walk method on student1
		console.log(student1.walk(5));  // this should throw an exception: TypeError
	}
	catch(exception){
		console.log(exception);
	}

	// Inherit Student from Person
	Student.prototype = Object.create(Person.prototype);
	// Assign constructor back to Student
	Student.prototype.constructor = Student;

	console.log("********************* Results after inheritance *********************");
	// create object of Student object
	var student1 = new Student("Jill", "Economics"); // My name is Jill and i am stydying Math
	// test name and subject
	console.log('My name is', student1.name, 'and i am stydying', student1.subject);
	// check if student1 is Student
	console.log(student1 instanceof Student); // true
	// check if student1 is Person
	console.log(student1 instanceof Person); // true
	// invoke walk method on student1
	console.log(student1.walk(7));  // this should log Steps 7 times on the console

	// utility method for inheritance
	Function.prototype.inheritFrom = function(baseObject){
		this.prototype = Object.create(baseObject.prototype);
		this.prototype.constructor = baseObject;
	}

	// Student constructor
	function Doctor(name, specialization){
		Person.call(this, name);
		this.specialization = specialization;
	}

	// inherit Doctor from Person using utility method
	Doctor.inheritFrom(Person);
	
	console.log("********************* Results for doctor object *********************");
	// create object of Student object
	var doctor = new Doctor("Adam", "Surgeon");
	// test name and specialization
	console.log('My name is', doctor.name, 'and i am a', doctor.specialization);
	// check if doctor is Student
	console.log(doctor instanceof Doctor); // true
	// check if doctor is Person
	console.log(doctor instanceof Person);  // true
	// invoke walk method on doctor
	console.log(doctor.walk(4)); // this should log Steps 4 times on the console

})();