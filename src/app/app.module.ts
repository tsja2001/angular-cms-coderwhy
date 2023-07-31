import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './pages/home/home-layout/home-layout.component';
import { HomeLoginComponent } from './pages/home/home-login/home-login.component';
import { HomeSignupComponent } from './pages/home/home-signup/home-signup.component';

import { UserService } from './request/user.service';
import { RequestService } from './request/request.service';

import { StorageService } from './utils/storage.service';

import { AppRoutingModule } from './router/app-routing.module';
import { MainLayoutComponent } from './pages/main/main-layout.component';
import { SiderBarComponent } from './pages/main/layout/sider-bar/sider-bar.component';
import { DashboardComponent } from './pages/main/module/analysis/dashboard/dashboard.component';
import { HeaderComponent } from './pages/main/layout/header/header.component';
import { AlertComponent } from './component/feedback/alert/alert.component';
import { OverviewComponent } from './pages/main/module/analysis/overview/overview.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ModalComponent } from './component/feedback/modal/modal.component';
import { UserComponent } from './pages/main/module/system/user/user.component';
import { FormComponent } from './pages/main/module/system/user/form/form.component';
import { TableComponent } from './pages/main/module/system/user/table/table.component';
import { UserStatusPipe } from './utils/user-status.pipe';
// import { UserComponent } from './';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    HomeLoginComponent,
    HomeSignupComponent,
    MainLayoutComponent,
    SiderBarComponent,
    DashboardComponent,
    HeaderComponent,
    AlertComponent,
    OverviewComponent,
    NotFoundComponent,
    ModalComponent,
    UserComponent,
    FormComponent,
    TableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UserService, RequestService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
