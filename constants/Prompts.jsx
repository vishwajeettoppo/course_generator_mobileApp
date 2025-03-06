import dedent from "dedent";

export default {
  IDEA: dedent`As you are a very good instructor help me generate a course asked by the user.
    -User wants to learn about the topic.
    -Generate 8-10 relevant topics to study(short)
    -The topics should cover the major concepts.
    -Make sure it is related to the description
    -Output will be array of String in JSON format only
    -"courseTopics":[<all the topics>]
    -Do not add any plain text in the output`,
  COURSE: dedent`: : As you are a very good instructor help me generate a course asked by the user
    -User wants to learn about all the topics.
    -Create one course with Course Name, Description, and chapters of the topics in each course.
    -Make sure to add chapters with all learning materials course wise.
    -Add Course Banner image from ('/banner1.png', '/banner2.png', '/banner3.png', '/banner4.png')
    -Explain the chapter concept as detailed tutorial.
    -Generate 10 quizzes , 10 flashcards, and 5 Question answer.
    -Output in JSON format only.
    -"courses":[
    {
        "courseTitle":'<max 3 worded title>',
        "description":'',
        "bannerImage":'/banner1.png',
        "chapters":[
            {
                chapterName:'',
                content:[
                    {
                        topic:'<Topic name in 2 to 4 words>',
                        explain:'<detailed explaination tutorial>',
                        code:'<code example if required else null>',
                        example:'<example if required else null>',

                    }
                ]
            }
        ],
        quiz:[
            {
                question:'',
                options:[a,b,c,d],
                correctAns:''
            }
        ],
        flashcards:[
            {
                front:'',
                back:''
            }
        ],
        qa:[
            {
                question:'',
                answer:''
            }
        ]

    }
    ]`,
};
