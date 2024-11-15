"use client";

import DefaultLayout from '@/components/Layout';
import React from 'react'
import ProtectedRoute from '../ProtectedRoute';

function page({children}) {
  return (
    // <Provider store={store}>
    <ProtectedRoute>
    <DefaultLayout>
      {children}
     </DefaultLayout>
     </ProtectedRoute>
    //  </Provider>
  )
}

export default page