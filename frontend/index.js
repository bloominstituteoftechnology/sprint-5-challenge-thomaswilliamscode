async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  let resValue;

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // urls
  const URLA = 'http://localhost:3003/api/learners';
  const URLB = 'http://localhost:3003/api/mentors';

  // grab container Div
  const cardsDiv = grab('.cards')
  

// easily grabs elements on page
  function grab(string) {
    return document.querySelector(string)
  }

  // easily creates elements
  function create(string) {
    return document.createElement(string)
  }

  // easily appends elements
  function append(appending, appendTo) {
		appendTo.appendChild(appending);
	}

  // easily add classlist 
  function classAdd(element, string) {
    element.classList.add(string)
  }




  function toggleSelected (element, e, h4, cardDiv, name, selectedName, basicName) {
    // check to see if something is selected
    let selected = document.querySelector('.selected')
    let open = document.querySelector('.open')
    let message = `The selected learner is ${basicName}`
    let basicMessage = 'No learner is selected';
    let info = document.querySelector('.info')

    if (h4 === e.target) {
      if (h4.classList.contains('closed')) {
        if (!open) {
          h4.classList.remove('closed');
					h4.classList.add('open');
        } else {
          h4.classList.remove('closed');
          h4.classList.add('open')
          
        }
        
      } else {
        
        h4.classList.remove('open')
        h4.classList.add('closed')
      }
    }

    // if click on selected, then just unselect it & basic name
    if (selected) {
      if ( (selected === e.currentTarget) && (e.target != h4) ) {
        e.currentTarget.classList.remove('selected')
        info.textContent = basicMessage
        cardDiv.children[0].textContent = basicName
      } else {
        selected.children[0].textContent = basicName
        selected.classList.remove('selected')
        e.currentTarget.classList.add('selected')
        info.textContent = message
        name.textContent = selectedName
      }
    } else {
      element.classList.add('selected');
      info.textContent = message;
      name.textContent = selectedName
    }


    // if click on unsolected and nothing else is selected then select it, and select name

    // if click on unsolected and something else is selected already, unselect that, and basic text on all names, and then select what you clicked on and select text
      
    } 


  // create click event for each card.

  // function to break down every object inside of the array
  function main (arrayOfObjects, mentorArray) {
    let newArray = [];

		mentorArray.forEach((obj) => {
			let { id, firstName, lastName } = obj;
			let variable = [id, firstName, lastName];
			newArray.push(variable);
		});
    
    arrayOfObjects.forEach( people => {
			// destructure people objects
			let { id, fullName, email, mentors } = people;

			// create card div & append it
			const cardDiv = create('div');
			append(cardDiv, cardsDiv);
			classAdd(cardDiv, 'card');

			// only show id if card is selected

			// output name h3
			const name = create('h3');
			append(name, cardDiv);
      let basicName = `${fullName}`;
			name.textContent = basicName;
      let selectedName = `${fullName}, ID ${id}`;

			// output email div
			const emailDiv = create('div');
			append(emailDiv, cardDiv);
			emailDiv.textContent = email;

			// h4 class closed
			const h4 = create('h4');
			append(h4, cardDiv);
			classAdd(h4, 'closed');
			h4.textContent = 'Mentors';

			// click event for h4
			cardDiv.addEventListener('click', (e) => {
				
        if  (e.currentTarget === cardDiv) {
          toggleSelected(cardDiv, e, h4, cardDiv, name, selectedName, basicName)
        }
			});

			// put mentor function here
      const gettingMentors = mentor(people, newArray, cardDiv)
      
      
		})
  }

  // mentor function takes in mentor 
  
  function mentor(people, mentorArray, cardDiv) {

    const ul = create('ul');
		append(ul, cardDiv);

    let {id, fullName, email, mentors} = people

    for (let i = 0; i < mentors.length; i++) {

      const li = create('li')
      returnValue = ``

      mentorArray.map(id => {
        if (id[0] === mentors[i]) {
          returnValue = `${id[1]} ${id[2]}`
        }
          
      })

      li.textContent = returnValue
      append(li, ul)


    }
  }



  // testing
  axios.get(URLA)
    .then( res => {
      resValue = res
      return getMentors()
    }) 
    .then(mentorsData => {
      let info = document.querySelector('.info');
      main(resValue.data, mentorsData)
      info.textContent = 'No learner is selected';
    }) 
    .catch(err => {
      console.log(err)
    })

  function getMentors() {
		return axios
		.get(URLB)
		.then((resolt) => {
			return resolt.data
			
		})
		.catch((err) => {
			return err;
		});
	}


    

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
