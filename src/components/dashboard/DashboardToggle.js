import React,{ useCallback } from 'react'
import { Alert, Button , Drawer, Icon} from 'rsuite'
import Dashboard from './index'
import { auth, database } from '../../misc/Firebase'
import { isOfflineForDatabase } from '../../context/profile.context'
import { useModalState, useMediaQuery } from '../../misc/custom-hooks'

const DashboardToggle = () => {

    const { isOpen, close, open } = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)')

    const onSignOut = useCallback(
      () => {

        database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase)
        .then(() => {
          auth.signOut();
          Alert.info('Signed Out Successfully!!', 4000)
        })
        .catch(err => {
          Alert.error(err.message, 4000)
        })

        close()
      },
      [close],
    )

    return (
        <>
          <Button block color="blue" onClick={open}>
            <Icon icon="dashboard" />Dashboard
          </Button>  

          <Drawer full={isMobile} show={isOpen} onHide={close} placement="left" >
            <Dashboard onSignOut={onSignOut}/>
          </Drawer>
        </>
    )
}

export default DashboardToggle
