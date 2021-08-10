import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostContext } from '../../contexts/PostContext';

const AddPostModal = () => {
    // Contexts
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
        useContext(PostContext);

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });
    const { title, description, url } = newPost;
    const onChaneNewPostForm = (event) =>
        setNewPost({ ...newPost, [event.target.name]: event.target.value });

    const closeDialog = () => {
        resetAddPostData();
    };
    const onSubmit = async (event) => {
        event.preventDefault();

        const { success, message } = await addPost(newPost);
        resetAddPostData();
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
    };
    const resetAddPostData = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN',
        });
        setShowAddPostModal(false);
    };
    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='my-3'>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChaneNewPostForm}
                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            placeholder='Description'
                            rows={3}
                            name='description'
                            value={description}
                            onChange={onChaneNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group className='my-3'>
                        <Form.Control
                            type='text'
                            placeholder='Tutorial URL'
                            name='url'
                            value={url}
                            onChange={onChaneNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;
