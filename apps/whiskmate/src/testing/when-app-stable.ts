import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export async function whenAppStable() {
  await TestBed.inject(ApplicationRef).whenStable();
}
