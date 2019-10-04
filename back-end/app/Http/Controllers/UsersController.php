<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function register(Request $request) {

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique',
            'password' => 'required|min:8'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        
        return 'success';
    }
}
