import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../Utils/Loading";
import { AddBookModal } from "./AddBookModal";
import Book from "./Book";
import UserContext from "../../UserContext";

const Books = () => {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    const {user} = useContext(UserContext)
    
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false)
    }

    const getBooks = () => {
        setIsLoading(true)
        const promise = axios.get("https://bd-projeto-back.onrender.com/books")
        promise
        .then(res=>{
            setBooks(res.data)
            setIsLoading(false)
        })
        .catch(err=>{
            console.log(err.response.data)
            setIsLoading(false)
        })
    }
    
    useEffect(() => {
        getBooks()
    }, [])

    const searchBooks = () => {
        setIsLoading(true)
        const promise = axios.get("https://bd-projeto-back.onrender.com/books", { params: {searchTerm} })
        promise
        .then(res=>{
            setBooks(res.data)
            setIsLoading(false)
        })
        .catch(err=>{
            console.log(err.response.data)
            setIsLoading(false)
        })
    }

    return(
        <ContentContainer>
            <AddBookModal modalIsOpen={modalIsOpen} closeModal={closeModal} getBooks={getBooks}/>
            <Search>
                <input type="text" name="" id="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={searchBooks}><i className="fa-solid fa-magnifying-glass"></i></button>
            </Search>
            <BooksContainer>
                {user.funcao == "Chefe de Laboratorio" &&
                    <AddItem onClick={openModal}> + <i className="fa-solid fa-book"></i></AddItem>
                }
                {isLoading && <Loading/>}
                {books?.map((book, index) => (
                    <Book key={index} book={book}/>
                ))}
            </BooksContainer>
        </ContentContainer>
    )
}

export default Books

//styles
const ContentContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    margin-top: 70px;
`

const BooksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 20px 100px;
    position: relative;
`

const Search = styled.div`
    padding-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    input{
        width: 400px;
        height: 35px;
        border-radius: 5px 0 0 5px;
        border: none;
        border-left: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        border-top: 1px solid #efefef;
        box-sizing: border-box;
        padding: 0 10px;
        &:focus{
            outline: none;
        }
    }
    button{
        height: 35px;
        width: 40px;
        border: none;
        border-right: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        border-top: 1px solid #efefef;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
    }
`

const AddItem = styled.button`
    position: absolute;
    background-color: #1da138;
    border: none;
    border-radius: 5px;
    right: 30px;
    width: 60px;
    height: 40px;
    color: #fff;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    i{
        font-size: 20px;
        margin-left: 4px;
    }
`