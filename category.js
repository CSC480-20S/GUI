//Takes a string listindex as a parameter 
function dynamicdropdown(listindex) {
  document.getElementById("subcategory").length = 0;
  switch (listindex) {
    case "Categorization":
      document.getElementById("subcategory").options[0] = new Option("Subcategory", "");
      document.getElementById("subcategory").options[1] = new Option("Induction and acquisition", "Induction and acquisition");
      document.getElementById("subcategory").options[2] = new Option("Judgement and classification", "Judgement and classification");
      document.getElementById("subcategory").options[3] = new Option("Representation and structure", "Representation and structure");
      document.getElementById("subcategory").options[4] = new Option("Similarity", "Similarity");
      break;

    case "Knowledge representation":
      document.getElementById("subcategory").options[0] = new Option("Subcategory", "");
      document.getElementById("subcategory").options[1] = new Option("Dual-coding theories", "Dual-coding theories");
      document.getElementById("subcategory").options[2] = new Option("Media psychology", "Media psychology");
      document.getElementById("subcategory").options[3] = new Option("Mental imagery", "Mental imagery");
      document.getElementById("subcategory").options[4] = new Option("Numerical cognition", "Numerical cognition");
      document.getElementById("subcategory").options[5] = new Option("Proposition encoding", "Proposition encoding");
      break;

    case "Language":
      document.getElementById("subcategory").options[0] = new Option("Subcategory", "");
      document.getElementById("subcategory").options[1] = new Option("Language acquisition", "Language acquisition");
      document.getElementById("subcategory").options[2] = new Option("Language processing", "Language processing");
      document.getElementById("subcategory").options[3] = new Option("Linguistic grammar", "Linguistic grammar");
      document.getElementById("subcategory").options[4] = new Option("Phonetics Phonology", "Phonetics Phonology");
      break;

    case "Memory":
      document.getElementById("subcategory").options[0] = new Option("Subcategory", "");
      document.getElementById("subcategory").options[1] = new Option("Aging and memory", "Aging and memory");
      document.getElementById("subcategory").options[2] = new Option("Autobiographical memory", "Autobiographical memory");
      document.getElementById("subcategory").options[3] = new Option("Childhood memory", "Childhood Memory");
      document.getElementById("subcategory").options[4] = new Option("Constructive memory", "Constructive memory");
      document.getElementById("subcategory").options[5] = new Option("Emotion and memory", "Emotion and memory");
      document.getElementById("subcategory").options[6] = new Option("Episodic memory", "Episodic memory");
      document.getElementById("subcategory").options[7] = new Option("Eyewitness memory", "Eyewitness memory");
      break;

    case "Perception":
      document.getElementById("subcategory").options[0] = new Option("Subcategory", "");
      document.getElementById("subcategory").options[1] = new Option("Attention", "Attention");
      document.getElementById("subcategory").options[2] = new Option("Object recognition", "Object recognition");
      document.getElementById("subcategory").options[3] = new Option("Pattern recognition", "Pattern recognition");
      document.getElementById("subcategory").options[4] = new Option("Perception", "Perception");
      document.getElementById("subcategory").options[5] = new Option("Form perception", "Form perception");
      document.getElementById("subcategory").options[6] = new Option("Psychophysics", "Psychophysics");
      break;

    case "Cognition":
      document.getElementById("subcategory").options[0] = new Option("Subcategory", "");
      document.getElementById("subcategory").options[1] = new Option("Choice", "Choice");
      document.getElementById("subcategory").options[2] = new Option("Concept formation", "Concept formation");
      document.getElementById("subcategory").options[3] = new Option("Decision making", "Decision making");
      document.getElementById("subcategory").options[4] = new Option("Logic", "Logic");
      document.getElementById("subcategory").options[5] = new Option("Psychology of reasoning", "Psychology of reasoning");
      break;
  }
  return true;
}
