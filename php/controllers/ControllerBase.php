<?php

abstract class ControllerBase {
    /**
     * @var array $requirements Stores predicates and their arguments to call before request dispatch
     * Format: [[callable_function, [arg1, arg2, ...]], ...]
     */
    protected array $requirements = [];
    protected array $view_data =[];
    protected string $page_title = "Page Title";
    protected string $view_path ='';
    protected string $base_url_prefix = '';

    public function dispatch(): void {
        $this->check_requirements(); //before dispatching to post or get, check if requirements are met

        if ($_SERVER['REQUEST_METHOD'] === 'POST')
            $this->post();
        else
            $this->get();
    }

    public function get_view_data(){
        return $this->view_data;
    }

    protected function get():void {
        header("HTTP/1.0 405 Method Not Allowed");
        die("Error 405: GET method not allowed or not implemented for this controller.");
    }

    protected function post(): void {
        header("HTTP/1.0 405 Method Not Allowed");
        die("Error 405: POST method not allowed or not implemented for this controller.");
    }

    protected function check_requirements(): void {
        foreach ($this->requirements as $requirement) {
            $callback = $requirement[0]; 
            $args = $requirement[1] ?? [];

            if (is_callable($callback)) {
                call_user_func_array($callback, $args);
            } else {
                error_log("Attempted to call non-callable requirement: " . (is_string($callback) ? $callback : 'unknown type'));
                die("Critical error: Invalid controller requirement. Please check your requirements array");
            }
        }
    }
}