<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ':attribute måste godkännas.',
    'active_url'           => ':attribute är inte en giltig url.',
    'after'                => ':attribute måste vara efter :date.',
    'after_or_equal'       => ':attribute måste vara ett datum och samma datum som :date.',
    'alpha'                => ':attribute kan bara innehålla bokstäver',
    'alpha_dash'           => ':attribute kan bara innehålla tecken, nummer och bindestreck.',
    'alpha_num'            => ':attribute kan bara innehålla tecken och nummer.',
    'array'                => ':attribute måste vara en array',
    'before'               => ':attribute måste vara ett datum före :date.',
    'before_or_equal'      => ':attribute måste vara före eller samma datum som :date.',
    'between'              => [
        'numeric' => ':attribute måste vara mellan :min och :max.',
        'file'    => ':attribute måste vara mellan :min och :max kilobytes.',
        'string'  => ':attribute måste vara mellan :min och :max bokstäver.',
        'array'   => ':attribute måste vara mellan :min och :max saker.',
    ],
    'boolean'              => ':attribute fältet måste vara sant eller falskt',
    'confirmed'            => ':attribute stämmer inte överens med fältet ovan',
    'date'                 => ':attribute är inte ett giltigt datum.',
    'date_format'          => ':attribute matchar inte datumformatet :format.',
    'different'            => ':attribute måste vara annorlunda från :other .',
    'digits'               => ':attribute måste vara :digits tecken.',
    'digits_between'       => ':attribute måste vara mellan :min och :max symboler.',
    'dimensions'           => ':attribute har ogiltiga dimensioner för bilder.',
    'distinct'             => ':attribute fältet har flera värden.',
    'email'                => ':attribute måste vara en giltig epostadress.',
    'exists'               => 'valda :attribute är ogiltig.',
    'file'                 => ':attribute måste vara en fil',
    'filled'               => ':attribute måste ha ett värde',
    'image'                => ':attribute måste vara en bild',
    'in'                   => 'valda :attribute är ogiltigt.',
    'in_array'             => ':attribute finns inte i :other.',
    'integer'              => ':attribute måste vara ett nummer.',
    'ip'                   => ':attribute måste vara en giltig ip-address.',
    'json'                 => ':attribute måste vara en giltig JSON-sträng.',
    'max'                  => [
        'numeric' => ':attribute får inte vara större än :max.',
        'file'    => ':attribute får inte vara större än :max kilobytes.',
        'string'  => ':attribute får inte vara större än:max characters.',
        'array'   => ':attribute får inte vara större än:max items.',
    ],
    'mimes'                => 'The :attribute must be a file of type: :values.',
    'mimetypes'            => 'The :attribute must be a file of type: :values.',
    'min'                  => [
        'numeric' => 'The :attribute must be at least :min.',
        'file'    => 'The :attribute must be at least :min kilobytes.',
        'string'  => 'The :attribute must be at least :min characters.',
        'array'   => 'The :attribute must have at least :min items.',
    ],
    'not_in'               => 'The selected :attribute is invalid.',
    'numeric'              => 'The :attribute must be a number.',
    'present'              => 'The :attribute field must be present.',
    'regex'                => 'The :attribute format is invalid.',
    'required'             => ':attribute måste finnas med.',
    'required_if'          => 'The :attribute field is required when :other is :value.',
    'required_unless'      => 'The :attribute field is required unless :other is in :values.',
    'required_with'        => 'The :attribute field is required when :values is present.',
    'required_with_all'    => 'The :attribute field is required when :values is present.',
    'required_without'     => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same'                 => 'The :attribute and :other must match.',
    'size'                 => [
        'numeric' => 'The :attribute must be :size.',
        'file'    => 'The :attribute must be :size kilobytes.',
        'string'  => 'The :attribute must be :size characters.',
        'array'   => 'The :attribute must contain :size items.',
    ],
    'string'               => ':attribute måste vara en sträng.',
    'timezone'             => 'The :attribute must be a valid zone.',
    'unique'               => 'The :attribute has already been taken.',
    'uploaded'             => 'The :attribute failed to upload.',
    'url'                  => 'The :attribute format is invalid.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
