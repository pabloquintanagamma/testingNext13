'use client';
import styles from '../../styles/Home.module.css'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewEntry(){
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const router = useRouter();

    const create = async (e:any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8090/api/collections/diary/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    text,
                }),
            });
            setText('');
            setTitle('');
            router.refresh();           
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={create} className={styles.paper}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className={styles.paper_content}>
                <textarea
                    placeholder="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.textarea_paper}
                />
            </div>

            <button type="submit" className={styles.create_entry_button}>
                Create entry
            </button>
        </form>
    )
}