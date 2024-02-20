'use client'

import { useDispatch, useSelector, useStore } from 'react-redux'

// Use throughout your app instead of plain `` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;