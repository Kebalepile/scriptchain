import React, { useState, useContext, Fragment } from 'react'
import Context from "../../context/scriptchain/Context"
import PrettyJSON from "../utils/PrettyJSON"

// sends a transaction to the blockchian.
const MakeTransaction = () => {
    const {
        makeTransaction
    } = useContext(Context)
    const [transaction, setTransaction] = useState({
        sender: '',
        recipient: '',
        amount: '',
        message: '',
        transactionMsg: null
    }),
        { sender, recipient, amount, message, transactionMsg } = transaction,

        onChange = e => setTransaction({ ...transaction, [e.target.name]: e.target.value }),

        onSubmit = e => {
            e.preventDefault()

            makeTransaction(transaction)
                .then(transactionMsg => {
                    setTransaction({
                        sender: '',
                        recipient: '',
                        amount: '',
                        message: '',
                        transactionMsg
                    })

                    setTimeout(() => {
                        setTransaction({ ...transaction, transactionMsg: null })
                    }, 5000)
                })

        }

    const transactionForm = () => {
        return (
            <form className="transaction" onSubmit={onSubmit}>
                <section>
                    <span>Sender</span> <input type="text" name="sender" value={sender} onChange={onChange} required />
                </section>
                <section>
                    <span>Recipient</span> <input type="text" name="recipient" value={recipient} onChange={onChange} required />
                </section>
                <section>
                    <span>Amount</span> <input type="number" name="amount" value={amount} onChange={onChange} required />
                </section>
                <section>
                    <span>Message</span> <textarea name="message" value={message} onChange={onChange}></textarea>
                </section>
                <input type="submit" value="Send" />
            </form>
        )
    }
    return (
        <Fragment>
            {
                Boolean(transactionMsg) ?
                    (
                        <Fragment>
                            <div className="transactionMsg">
                                <h4>{transactionMsg['message']} </h4>
                                <textarea disabled value={PrettyJSON(transactionMsg['transaction'])}></textarea>
                            </div>

                            <br />

                           { transactionForm()}
                        </Fragment>
                    )
                    :
                    (transactionForm())
            }
        </Fragment>
    )
}

export default MakeTransaction
