/* todos database with samples to be stored in the local browser storage
    in case there was nothing stored before
    (e.g. when the page is opened for the 1st time or the local data were deleted) */

const todos = [
    {deadline: "2461-06-04 16:01",
        todo: "Clean the room",
        datestamp:"2100-06-04 16:01"}, 
    {deadline: "2014-06-30 00:00",
        todo: "Mom's birthday! Call her!",
        datestamp: "2014-06-30 00:00"},
    {deadline: "2019-06-22 00:00",
        todo: "Buy flowers for your beloved and give it to her in the morning.",
        datestamp: "2019-06-22 00:00"},
    {deadline: "2020-06-04 09:06",
        todo: "Pay the bills",
        datestamp: "2020-06-04 09:06"},
    {deadline: "2019-08-31 14:27",
        todo: "Do nothing and just relax",
        datestamp: "2019-08-31 14:27"},
];

    let storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos == null) {
        storedTodos = todos;
        localStorage.setItem('todos', JSON.stringify(storedTodos));
    };