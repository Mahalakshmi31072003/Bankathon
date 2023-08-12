import os
import pyaudio
import wave
import pandas


CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 15

def record_voice(output_filename, duration=15):
    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    print("Recording...")

    frames = []
    for i in range(0, int(RATE / CHUNK * duration)):
        data = stream.read(CHUNK)
        frames.append(data)

    print("Recording completed.")

    stream.stop_stream()
    stream.close()
    p.terminate()

    with wave.open(output_filename, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(p.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))

    print("Audio saved to:", output_filename)



def get_answers():
    answers = []
    for language in questions.keys():
        print(f"Please answer the questions for {language}:")
        language_questions = questions[language]
        language_answers = []
        for i, question in enumerate(language_questions):
            if input("Do you want to record your answer? (yes/no): ").lower() == "yes":
                output_filename = f"recorded_audio_{language}_{i + 1}.wav"
                record_voice(output_filename)
                
            else:
                answer = input(f"Question {i + 1}: {question}\nAnswer: ")
                language_answers.append(answer)
                print()
        answers.append((language, language_answers))
    return answers

questions = {
    "JAVA": ["What are the differences between abstract classes and interfaces in Java?", "Why is Java not a pure object-oriented language?", "Pointers are used in C/C++. Why does Java not make use of pointers?", "Why is Java not a pure object-oriented language?", "What do you mean by data encapsulation?"],
    "PYTHON": ["What is slicing in Python?", "What is Python?", "What is the use of Python?", "What is __init__?", "What is break, continue, and pass in Python?"],
    "AI": ["What is AI?", "What is the use of AI?", "What are the programming languages used for Artificial Intelligence?", "What is the difference between a strong AI and a weak AI?"],
    "ML": ["What is ML?", "What is the use of ML?", "What is Deep Learning?", "What are different types of Machine Learning?"],
    "C": ["Who invented the C language?", "Where was C invented?", "What is a Preprocessor?", "How can a string be converted to a number?", "Why doesn't C support function overloading?"],
    "C++": ["What is the difference between C and C++?", "What is the difference between struct and class?", "What is a virtual function?", "What do you know about friend class and friend function?", "Define inline function"]
}

print("Please choose a programming language (Java, Python, AI, ML, C, C++):")
selected_language = input("Language: ").upper()

while selected_language in questions:
    language_questions = questions[selected_language]

    for i, question in enumerate(language_questions):
        print(f"Question {i + 1}: {question}")
        if input("Do you want to record your answer? (yes/no): ").lower() == "yes":
            output_filename = f"recorded_audio_{selected_language}_{i + 1}.wav"
            record_voice(output_filename)
            
        else:
            answer = input(f"Question {i + 1}: {question}\nAnswer: ")
            print()
    
    print("Recording and conversion completed for the selected language.")


    change_language = input("Do you want to choose another language? (yes/no): ")
    if change_language.lower() == "yes":
        print("Please choose a programming language (Java, Python, AI, ML, C, C++):")
        selected_language = input("Language: ").upper()
    else:
        print("Thank you, it's completed. Please exit.")
        break
else:
    print("Invalid language selection. Exiting program.")
