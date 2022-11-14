import { useEffect, useState } from "react";
import MainLayout from "../mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import {
    Autocomplete,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
    Checkbox,
    Container,

} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import apiRequests from "../../api/apiRequests";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useDispatch } from 'react-redux';
import { getAggregationMovePaType } from "../../api/apiRequestTypes";

const PaTransferListPage = ({ email }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [renderedAggList, setRenderedAggList]: any = useState(undefined)
    const [input1Value, setInput1Value]: any = useState(undefined);
    const [input2Value, setInput2Value]: any = useState(undefined);
    const [paList1, setPaList1]: any = useState(undefined);
    const [paList2, setPaList2]: any = useState(undefined);
    const [isInput2Disabled, setIsInput2Disabled]: any = useState(true);
    const [areInputsEqual, setAreInputsEqual]: any = useState(false);
    const [checked, setChecked]: any = useState([]);

    useEffect(() => {
        getAggregates();
    }, []);

    const getAggregates = () => {
        let request = apiRequests.getAggregates({})
        if (request) {
            request
                .then(res => {
                    setRenderedAggList(res);
                })
                .catch(err => {
                    console.log("Errore: ", err)
                })
        }
    }

    const handleChangeInput1 = (e: any, value: any) => {
        isInput2Disabled && setIsInput2Disabled(false)
        setChecked([]);
        setInput1Value(value)
        setPaList1(undefined)
        if (value === input2Value && value !== null) {
            setAreInputsEqual(true)
        }
        else {
            setAreInputsEqual(false)
        }
        value && getPas1(e, value)
    }

    const handleChangeInput2 = (e: any, value: any) => {
        setInput2Value(value)
        setPaList2(undefined)
        if (input1Value === value && value !== null) {
            setAreInputsEqual(true)
        }
        else {
            setAreInputsEqual(false)
        }
        value && getPas2(e, value)
    }

    const getPas1 = (e: any, value: any) => {
        setPaList1(undefined)
        let idAggregation = value?.id
        let request = apiRequests.getAssociatedPaList(idAggregation)
        if (request) {
            request
                .then(res => {
                    setPaList1(res);
                })
                .catch(err => {
                    console.log("Errore: ", err)
                })
        }
    }

    const getPas2 = (e: any, value: any) => {
        setPaList2(undefined)
        let idAggregation = value?.id
        let request = apiRequests.getAssociatedPaList(idAggregation)
        if (request) {
            request
                .then(res => {
                    setPaList2(res);
                })
                .catch(err => {
                    console.log("Errore: ", err)
                })
        }
    }

    const addToChecked = (pa: any) => {
        if (!checked.includes(pa)) {
            setChecked([...checked, pa])
        }
        else {
            setChecked(checked.filter((item: any) => item !== pa))
        }
    }

    const handleTransfer = () => {
        const payload: getAggregationMovePaType | any = {
            items: [...checked]
        }
        let request = apiRequests.getAggregationMovePa(input2Value.id, payload)
        if (request) {
            request
                .then(res => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true))
                    dispatch(snackbarActions.updateStatusCode(res.status))
                    if (res.status === 200) {
                        dispatch(snackbarActions.updateMessage("PA trasferite con successo"));
                    }
                    else {
                        console.log("Status: ", res.status)
                        dispatch(snackbarActions.updateMessage("Errore nel trasferimento delle PA"));
                    }

                })
                .catch(err => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true))
                    dispatch(snackbarActions.updateStatusCode(400))
                    dispatch(snackbarActions.updateMessage("Errore nel trasferimento delle PA"))
                    console.log("Errore: ", err)
                })
        }
        setChecked([]);
        getPas1(undefined, input1Value);
        getPas2(undefined, input2Value);
    }

    return (
        <MainLayout email={email}>
            <Container><h1>Trasferimento di PA</h1></Container>
            <Container style={{ marginTop: 20 }}>
                <div className="agg-selection" style={{ display: 'flex', gap: 350 }}>
                    <Autocomplete
                        onChange={handleChangeInput1}
                        options={renderedAggList?.items || [{ id: 'Caricamento', name: 'Caricamento' }]}
                        sx={{ width: 500 }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => <TextField {...params} label="Aggregazione di partenza" />}
                    />
                    <Autocomplete
                        onChange={handleChangeInput2}
                        options={renderedAggList?.items || [{ id: 'Caricamento', name: 'Caricamento' }]}
                        sx={{ width: 500 }}
                        disabled={isInput2Disabled}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => <TextField error={areInputsEqual} helperText={areInputsEqual ? "Scegli una lista di aggregazione diversa" : null} {...params} label="Aggregazione di destinazione" />}
                    />
                </div>
                <div className="transfer-list" style={{ display: 'flex', gap: 100, marginTop: 50 }}>
                    <List style={{ backgroundColor: 'white', width: 500, height: 500, overflow: 'auto' }}>
                        {paList1 && paList1?.items?.length < 1 ? <ListItem>La lista è vuota</ListItem>
                            : paList1?.items?.map((pa: any, ind: number) => (
                                <ListItem key={pa.id}>
                                    <ListItemIcon>
                                        <Checkbox
                                            onChange={() => addToChecked(pa)}
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': pa.id }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={pa.id} primary={pa.name} />
                                </ListItem>
                            ))}
                    </List>
                    <div style={{ width: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {(isInput2Disabled || areInputsEqual || !input1Value || !input2Value || checked?.length < 1) ?
                            <Button variant="contained" disabled>Trasferisci<SendIcon fontSize="small" style={{ marginLeft: 10 }} /></Button>
                            : <Button variant="contained" onClick={handleTransfer}>Trasferisci<SendIcon fontSize="small" style={{ marginLeft: 10 }} /></Button>}
                    </div>
                    <List style={{ backgroundColor: 'white', width: 500, height: 500, overflow: 'auto' }}>
                        {!areInputsEqual && paList2 && paList2?.items?.length < 1 ? <ListItem>La lista è vuota</ListItem>
                            : paList2?.items?.map((pa: any) => (
                                <ListItem key={pa.id}>
                                    <ListItemIcon>
                                        <Checkbox
                                            disabled
                                            checked={false}
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': pa.id }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={pa.id} primary={pa.name} />
                                </ListItem>
                            ))

                        }
                    </List>
                </div>
            </Container>
        </MainLayout>
    )
};
export default PaTransferListPage;