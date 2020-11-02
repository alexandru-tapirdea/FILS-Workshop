import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useForm } from "react-hook-form";
import "./AddTodoForm.css"


function AddTodoForm({ setTodosList, todosList }) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = newTodoItem => {
        console.log(newTodoItem)
        const newList = [...todosList, newTodoItem]
        setTodosList(newList)
    }
    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Add a new Todo</h2>
                <br />
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input innerRef={register({ required: true })} name="title" id="title" />
                    {errors.title && "Title is required"}
                </FormGroup>
                <FormGroup>
                    <Label for="category-select">Select a category </Label>
                    <Input type="select" name="category" id="category-select" innerRef={register()}>
                        <option>University</option>
                        <option>Work</option>
                        <option>Family</option>
                        <option>Sport</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="deadline">Deadline</Label>
                    <Input
                        type="date"
                        name="deadline"
                        id="deadline"
                        placeholder="date placeholder"
                        innerRef={register({ required: true })} />
                    {errors.deadline && "A deadline is required"}
                </FormGroup>
                <Button color="primary" type="submit">Submit</Button>
            </Form>
        </div >
    );
}

export default AddTodoForm;
