'use client';

import React from 'react';
import { Header } from './Header';
import { NavLink, StoreConfig } from '@/types';

interface HeaderWrapperProps {
  storeConfig: StoreConfig;
  logoLine1: string;
  logoLine2: string;
  navLinks: NavLink[];
}

export function HeaderWrapper({ storeConfig, logoLine1, logoLine2, navLinks }: HeaderWrapperProps) {
  return <Header storeConfig={storeConfig} logoLine1={logoLine1} logoLine2={logoLine2} navLinks={navLinks} />;
}
